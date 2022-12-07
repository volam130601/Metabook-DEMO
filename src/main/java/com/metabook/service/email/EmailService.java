package com.metabook.service.email;

import com.metabook.dto.EmailDetails;

import java.util.Map;

public interface EmailService {
    Map<String, String> sendHtmlMessage(EmailDetails emailDetails);
}
