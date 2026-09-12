import { StyleSheet, Text, View } from 'react-native';

import type { DetailProduct } from '@/models/detail';

type ProductReviewsProps = {
  product: DetailProduct;
};

export default function ProductReviews({ product }: ProductReviewsProps) {
  const reviews = product.reviews ?? [];

  if (reviews.length === 0) {
    return (
      <View style={styles.reviewsSection}>
        <Text style={styles.sectionTitle}>Customer reviews</Text>
        <Text style={styles.emptyText}>No reviews yet.</Text>
      </View>
    );
  }

  return (
    <View style={styles.reviewsSection}>
      <View style={styles.reviewsHeader}>
        <View>
          <Text style={styles.sectionTitle}>Customer reviews</Text>
          <Text style={styles.reviewSummary}>{reviews.length} reviews</Text>
        </View>

        <View style={styles.ratingSummary}>
          <Text style={styles.ratingSummaryScore}>{product.rating.toFixed(1)}</Text>
          <View style={styles.ratingSummaryStars}>
            {[1, 2, 3, 4, 5].map((star) => (
              <Text
                key={star}
                style={[
                  styles.summaryStar,
                  star <= Math.round(product.rating) && styles.summaryStarActive,
                ]}
              >
                ★
              </Text>
            ))}
          </View>
        </View>
      </View>

      {reviews.slice(0, 3).map((review, index) => (
        <View key={`${review.reviewerName}-${index}`} style={styles.reviewCard}>
          <View style={styles.reviewTopRow}>
            <View style={styles.reviewerInfo}>
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>{review.reviewerName.charAt(0).toUpperCase()}</Text>
              </View>

              <View>
                <Text style={styles.reviewerName}>{review.reviewerName}</Text>
                <Text style={styles.reviewDate}>Verified customer</Text>
              </View>
            </View>

            <View style={styles.reviewStarsRow}>
              {[1, 2, 3, 4, 5].map((star) => (
                <Text
                  key={star}
                  style={[
                    styles.reviewRating,
                    star <= review.rating && styles.reviewRatingActive,
                  ]}
                >
                  ★
                </Text>
              ))}
            </View>
          </View>

          <Text style={styles.reviewComment}>{review.comment}</Text>

        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  reviewsSection: {
    marginTop: 4,
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 4,
  },
  emptyText: {
    color: '#6b7280',
    fontSize: 13,
    marginTop: 6,
  },
  reviewsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  reviewSummary: {
    fontSize: 12,
    color: '#9ca3af',
    marginTop: 3,
  },
  ratingSummary: {
    alignItems: 'flex-end',
  },
  ratingSummaryScore: {
    fontSize: 22,
    fontWeight: '800',
    color: '#111827',
  },
  ratingSummaryStars: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  summaryStar: {
    fontSize: 13,
    color: '#d1d5db',
    marginLeft: 1,
  },
  summaryStarActive: {
    color: '#f59e0b',
  },
  reviewCard: {
    backgroundColor: '#f9fafb',
    borderRadius: 18,
    padding: 16,
    marginBottom: 10,
  },
  reviewTopRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  reviewerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#e5e7eb',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 11,
  },
  avatarText: {
    fontSize: 15,
    fontWeight: '800',
    color: '#374151',
  },
  reviewerName: {
    fontSize: 14,
    fontWeight: '700',
    color: '#111827',
  },
  reviewDate: {
    fontSize: 11,
    color: '#9ca3af',
    marginTop: 2,
  },
  reviewStarsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 8,
  },
  reviewRating: {
    fontSize: 13,
    color: '#d1d5db',
    marginLeft: 2,
  },
  reviewRatingActive: {
    color: '#f59e0b',
  },
  reviewComment: {
    color: '#4b5563',
    fontSize: 14,
    lineHeight: 21,
    marginTop: 13,
  },
 
});
