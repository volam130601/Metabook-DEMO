package com.metabook.util;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class AesEncryptionTest {

    @Autowired
    AesEncryption aesEncryption;

    @Test
    void testAes() {
        String key = "story";
        String str = "vo lam";
        String temp1 = aesEncryption.encrypt(str, key);
        System.out.println(temp1);
        System.out.println(aesEncryption.decrypt(temp1, key));
    }
}