package com.metabook.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class PostLikeDto {
    private long postId;
    private long totalLike;
}
