package com.campusconnect.Configuration;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class webConfig implements WebMvcConfigurer {

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        // Mapping the /uploads/** URL to the file system location of the uploads directory
        registry.addResourceHandler("/uploads/**")
                .addResourceLocations("file:uploads/"); // Make sure this path points to the correct location of your uploaded files
    }
}
