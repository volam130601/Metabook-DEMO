package com.metabook.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class CommentLikeDto {
    private long commentId;
    private long totalLike;
}
