package com.example.StackFlowBackend.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import com.example.StackFlowBackend.service.UsuarioDetailsService;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.*;
import java.util.stream.Collectors;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final Logger logger = LoggerFactory.getLogger(JwtAuthenticationFilter.class);

    private final JwtService jwtService;
    private final UsuarioDetailsService usuarioDetailsService;

    public JwtAuthenticationFilter(JwtService jwtService, UsuarioDetailsService usuarioDetailsService) {
        this.jwtService = jwtService;
        this.usuarioDetailsService = usuarioDetailsService;
    }

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain) throws ServletException, IOException {

        String path = request.getServletPath();

        if (path.startsWith("/api/auth/") || path.equals("/api/health")) {
            filterChain.doFilter(request, response);
            return;
        }

        String authHeader = request.getHeader("Authorization");
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            filterChain.doFilter(request, response);
            return;
        }

        String token = authHeader.substring(7);
        String username = null;
        try {
            username = jwtService.extractUsername(token);
        } catch (Exception ex) {
            logger.warn("JWT parse error: {}", ex.getMessage());
            filterChain.doFilter(request, response);
            return;
        }

        if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {

            UserDetails userDetails = usuarioDetailsService.loadUserByUsername(username);

            boolean valid = false;
            try {
                valid = jwtService.isTokenValid(token, userDetails);
            } catch (Exception ex) {
                logger.warn("Token validation exception: {}", ex.getMessage());
            }

            if (valid) {

                Collection<? extends GrantedAuthority> userAuthorities = userDetails.getAuthorities();


                String tokenRole = null;
                try {
                    tokenRole = jwtService.extractRole(token);
                } catch (Exception ex) {

                }

                Set<GrantedAuthority> finalAuthorities = new HashSet<>();
                if (userAuthorities != null) finalAuthorities.addAll(userAuthorities);

                if (tokenRole != null && !tokenRole.isBlank()) {
                    String norm = tokenRole.trim().toUpperCase();
                    String roleName = norm.startsWith("ROLE_") ? norm : ("ROLE_" + norm);
                    finalAuthorities.add(new SimpleGrantedAuthority(roleName));
                }

                // log for debugging
                logger.info("Authenticated '{}'. UserDetails authorities: {} ; Token role: {} ; Final authorities: {}",
                        username,
                        userAuthorities.stream().map(GrantedAuthority::getAuthority).collect(Collectors.toList()),
                        tokenRole,
                        finalAuthorities.stream().map(GrantedAuthority::getAuthority).collect(Collectors.toList())
                );

                UsernamePasswordAuthenticationToken authToken =
                        new UsernamePasswordAuthenticationToken(
                                userDetails,
                                null,
                                finalAuthorities
                        );

                authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                SecurityContextHolder.getContext().setAuthentication(authToken);
            } else {
                logger.warn("Token invalid for user {}", username);
            }
        }

        filterChain.doFilter(request, response);
    }
}
