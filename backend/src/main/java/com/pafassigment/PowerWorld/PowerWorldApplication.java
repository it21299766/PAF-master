package com.pafassigment.PowerWorld;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;

import com.pafassigment.PowerWorld.configuration.properties.ApplicationProperties;

@SpringBootApplication
@EnableConfigurationProperties(ApplicationProperties.class)
public class PowerWorldApplication {

    public static void main(String[] args) {
        SpringApplication.run(PowerWorldApplication.class, args);
    }

}
