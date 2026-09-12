import { StyleSheet, View } from 'react-native';

type ProductSkeletonProps = {
  count?: number;
};

export default function ProductSkeleton({ count = 1 }: ProductSkeletonProps) {
  const skeletonItems = Array.from({ length: count });

  return (
    <View style={styles.skeletonList}>
      {skeletonItems.map((_, index) => (
        <View key={`skeleton-${index}`} style={styles.skeletonCard}>
          <View style={styles.skeletonMedia}>
            <View style={styles.skeletonBadge} />
            <View style={styles.skeletonImage} />
          </View>

          <View style={styles.skeletonBody}>
            <View style={styles.skeletonEyebrowRow}>
              <View style={styles.skeletonEyebrow} />
              <View style={styles.skeletonDot} />
              <View style={styles.skeletonTag} />
            </View>

            <View style={styles.skeletonLineLong} />
            <View style={styles.skeletonLineMid} />
            <View style={styles.skeletonLineShort} />

            <View style={styles.skeletonRatingRow}>
              <View style={styles.skeletonRating} />
              <View style={styles.skeletonStock} />
            </View>

            <View style={styles.skeletonFooter}>
              <View style={styles.skeletonPrice} />
              <View style={styles.skeletonButton} />
            </View>
          </View>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  skeletonList: {
    gap: 18,
    paddingVertical: 6,
  },
  skeletonCard: {
    backgroundColor: '#fff',
    borderRadius: 24,
    overflow: 'hidden',
    shadowColor: '#111827',
    shadowOpacity: 0.08,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 8 },
    elevation: 3,
  },
  skeletonMedia: {
    position: 'relative',
    backgroundColor: '#f8f3ef',
    padding: 16,
  },
  skeletonBadge: {
    position: 'absolute',
    top: 16,
    left: 16,
    width: 70,
    height: 22,
    borderRadius: 999,
    backgroundColor: '#e5e7eb',
    zIndex: 1,
  },
  skeletonImage: {
    width: '100%',
    height: 260,
    borderRadius: 18,
    backgroundColor: '#e5e7eb',
  },
  skeletonBody: {
    padding: 18,
    gap: 10,
  },
  skeletonEyebrowRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  skeletonEyebrow: {
    width: 70,
    height: 12,
    borderRadius: 999,
    backgroundColor: '#e5e7eb',
  },
  skeletonDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#e5e7eb',
  },
  skeletonTag: {
    width: 72,
    height: 12,
    borderRadius: 999,
    backgroundColor: '#e5e7eb',
  },
  skeletonLineLong: {
    height: 18,
    width: '88%',
    borderRadius: 999,
    backgroundColor: '#ececec',
  },
  skeletonLineMid: {
    height: 14,
    width: '76%',
    borderRadius: 999,
    backgroundColor: '#e5e7eb',
  },
  skeletonLineShort: {
    height: 14,
    width: '60%',
    borderRadius: 999,
    backgroundColor: '#e5e7eb',
  },
  skeletonRatingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 4,
  },
  skeletonRating: {
    width: 80,
    height: 14,
    borderRadius: 999,
    backgroundColor: '#e5e7eb',
  },
  skeletonStock: {
    width: 90,
    height: 12,
    borderRadius: 999,
    backgroundColor: '#e5e7eb',
  },
  skeletonFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 6,
  },
  skeletonPrice: {
    width: 100,
    height: 24,
    borderRadius: 999,
    backgroundColor: '#e5e7eb',
  },
  skeletonButton: {
    width: 96,
    height: 38,
    borderRadius: 999,
    backgroundColor: '#e5e7eb',
  },
});
