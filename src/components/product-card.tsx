import { useState } from 'react';
import { Image, Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';

import type { Product } from '@/models/product';

export type { Product };

function formatPrice(value: number) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
}

export function ProductCard({ item }: { item?: Product }) {
  if (!item) {
    return null;
  }

  const router = useRouter();
  const [isPreviewVisible, setIsPreviewVisible] = useState(false);
  const salePrice = item.price * (1 - item.discountPercentage / 100);
  const productTags = item.tags?.length ? item.tags : ['general'];

  return (
    <>
      <View style={styles.card}>
        <View style={styles.media}>
          <Text style={styles.badge}>{item.discountPercentage}% off</Text>

          <Pressable onPress={() => setIsPreviewVisible(true)}>
            <Image source={{ uri: item.thumbnail }} style={styles.image} resizeMode="cover" />
          </Pressable>
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
            onPress={() =>
              router.push({
                pathname: '/product/[id]',
                params: { id: String(item.id) },
              })
            }
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

      <Modal visible={isPreviewVisible} transparent={false} animationType="fade" onRequestClose={() => setIsPreviewVisible(false)}>
        <View style={styles.modalContainer}>
          <Pressable style={styles.closeButton} onPress={() => setIsPreviewVisible(false)}>
            <Text style={styles.closeButtonText}>✕</Text>
          </Pressable>

          <Image source={{ uri: item.thumbnail }} style={styles.fullImage} resizeMode="contain" />

          <View style={styles.dimensionsContainer}>
            <Text style={styles.dimensionsTitle}>ProductDimensions</Text>
            <Text style={styles.dimensionText}>Width: {item.dimensions.width} cm</Text>
            <Text style={styles.dimensionText}>Height: {item.dimensions.height} cm</Text>
            <Text style={styles.dimensionText}>Depth: {item.dimensions.depth} cm</Text>
          </View>
        </View>
      </Modal>
    </>
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
  modalContainer: {
    flex: 1,
    backgroundColor: '#111827',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  closeButton: {
    position: 'absolute',
    top: 56,
    right: 20,
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 8,
    zIndex: 2,
  },
  closeButtonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 12,
  },
  fullImage: {
    width: '100%',
    height: '60%',
    borderRadius: 24,
    backgroundColor: '#fff',
  },
  dimensionsContainer: {
    width: '100%',
    marginTop: 18,
    backgroundColor: 'rgba(255,255,255,0.12)',
    borderRadius: 18,
    padding: 16,
  },
  dimensionsTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 10,
  },
  dimensionText: {
    color: '#f3f4f6',
    fontSize: 14,
    lineHeight: 22,
  },
});

export default ProductCard;
