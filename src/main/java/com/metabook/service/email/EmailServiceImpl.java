package com.metabook.service.email;

import com.metabook.dto.EmailDetails;
import com.metabook.dto.StatusCode;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.thymeleaf.context.Context;
import org.thymeleaf.spring5.SpringTemplateEngine;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import java.nio.charset.StandardCharsets;
import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
@Slf4j
public class EmailServiceImpl implements EmailService {

    private final JavaMailSender javaMailSender;
    private final SpringTemplateEngine springTemplateEngine;
    @Value("${spring.mail.username}")
    private String sender;

    @Override
    public Map<String, String> sendHtmlMessage(EmailDetails emailDetails) {
        Map<String, String> report = new HashMap<>();
        try {
            MimeMessage message = javaMailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, MimeMessageHelper.MULTIPART_MODE_MIXED_RELATED, StandardCharsets.UTF_8.name());
            Context context = new Context();
            context.setVariables(emailDetails.getProperties());
            helper.setFrom(sender);
            helper.setTo(emailDetails.getTo());
            helper.setSubject(emailDetails.getSubject());
            String html = springTemplateEngine.process(emailDetails.getTemplate(), context);
            helper.setText(html, true);

//            log.info("Sending email: {} with html body: {}", emailDetails, html);
            System.out.println("Email is sending....");
            javaMailSender.send(message);
            report.put("message", "Mail sent Successfully");
            report.put("status", StatusCode.SUCCESS);
            return report;
        } catch (MessagingException e) {
            report.put("message", "Error while sending mail!!!");
            report.put("status", StatusCode.FAILED);
            return report;
        }

    }
}
