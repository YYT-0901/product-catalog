import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

import type { Product } from '@/models/product';

export type { Product };

function formatPrice(value: number) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
}

export function ProductCard({ item }: { item?: Product }) {
  if (!item) {
    return null;
  }

  const salePrice = item.price * (1 - item.discountPercentage / 100);
  const productTags = item.tags?.length ? item.tags : ['general'];

  return (
    <View style={styles.card}>
      <View style={styles.media}>
        <Text style={styles.badge}>{item.discountPercentage}% off</Text>

        <Image source={{ uri: item.thumbnail }} style={styles.image} resizeMode="cover" />
      </View>

      <View style={styles.body}>
        <View style={styles.eyebrow}>
          <Text style={styles.brandText}>{item.brand}</Text>
          <Text style={styles.dot}>•</Text>
          <Text style={styles.tagText}>{productTags.join(' | ')}</Text>
        </View>

        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>

        <View style={styles.ratingRow}>
          <Text style={styles.rating}>★ {item.rating}</Text>
          <Text style={styles.stock}>{item.stock} available</Text>
        </View>

        <View style={styles.footer}>
          <View>
            <Text style={styles.price}>{formatPrice(salePrice)}</Text>
            <Text style={styles.compare}>{formatPrice(item.price)}</Text>
          </View>

          <Pressable
            accessibilityRole="button"
            onPress={() => {
              // TODO: navigate to product detail page
            }}
            style={styles.viewMoreButton}
          >
            <Text style={styles.viewMoreButtonText}>View more</Text>
          </Pressable>
        </View>

        <View style={styles.shippingRow}>
          <Text style={styles.shippingIcon}>🚚</Text>
          <Text style={styles.shippingText}>{item.shippingInformation}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 24,
    overflow: 'hidden',
    shadowColor: '#111827',
    shadowOpacity: 0.12,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 12 },
    elevation: 5,
  },
  media: {
    position: 'relative',
    backgroundColor: '#f8f3ef',
    padding: 16,
  },
  badge: {
    position: 'absolute',
    top: 16,
    left: 16,
    backgroundColor: '#111827',
    color: '#fff',
    fontSize: 11,
    fontWeight: '700',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    zIndex: 1,
  },
  image: {
    width: '100%',
    height: 260,
    borderRadius: 18,
  },

  body: {
    padding: 18,
  },
  eyebrow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 10,
  },
  brandText: {
    fontSize: 12,
    letterSpacing: 0.8,
    textTransform: 'uppercase',
    color: '#4b5563',
    fontWeight: '700',
  },
  dot: {
    fontSize: 12,
    color: '#9ca3af',
  },
  tagText: {
    fontSize: 12,
    color: '#4b5563',
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
    color: '#4b5563',
    marginBottom: 16,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 18,
  },
  rating: {
    fontSize: 13,
    fontWeight: '700',
    color: '#111827',
  },
  stock: {
    fontSize: 12,
    color: '#6b7280',
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  price: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111827',
  },
  compare: {
    fontSize: 13,
    color: '#9ca3af',
    textDecorationLine: 'line-through',
    marginTop: 4,
  },
  viewMoreButton: {
    backgroundColor: '#111827',
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 999,
  },
  viewMoreButtonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 14,
  },
  shippingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  shippingIcon: {
    fontSize: 14,
  },
  shippingText: {
    color: '#4b5563',
    fontSize: 12,
  },
});

export default ProductCard;
