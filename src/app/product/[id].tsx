import { useEffect, useState } from 'react';
import { ActivityIndicator, Dimensions, Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';

import { fetchProductById } from '@/api/productApi';
import ProductReviews from '@/components/product-reviews';
import type { DetailProduct } from '@/models/detail';

export default function ProductDetailPage() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const [product, setProduct] = useState<DetailProduct | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useEffect(() => {
    let isCancelled = false;

    async function loadProduct() {
      try {
        const productId = Number(id ?? 0);
        if (!productId) {
          throw new Error('Invalid product id.');
        }

        const nextProduct = (await fetchProductById(productId)) as DetailProduct;

        if (!isCancelled) {
          setProduct(nextProduct);
          setError(null);
        }
      } catch (err) {
        if (!isCancelled) {
          setError(err instanceof Error ? err.message : 'Failed to load product details.');
          setProduct(null);
        }
      } finally {
        if (!isCancelled) {
          setIsLoading(false);
        }
      }
    }

    loadProduct();

    return () => {
      isCancelled = true;
    };
  }, [id]);

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#111827" />
        <Text style={styles.loadingText}>Loading product…</Text>
      </View>
    );
  }

  if (error || !product) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>{error ?? 'Product not found.'}</Text>
        <Pressable style={styles.backButton} onPress={() => router.back()}>
          <Text style={styles.backButtonText}>Go back</Text>
        </Pressable>
      </View>
    );
  }

  const productImages = product.images && product.images.length > 0 ? product.images : [product.thumbnail];
  const salePrice = product.price * (1 - product.discountPercentage / 100);
  const screenWidth = Dimensions.get('window').width;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.iconButton}>
          <Text style={styles.iconText}>←</Text>
        </Pressable>
        <Text style={styles.headerTitle}>{product.brand}</Text>
        
      </View>

      <View style={styles.galleryContainer}>
        <ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          style={styles.gallery}
          contentContainerStyle={styles.galleryContent}
          onMomentumScrollEnd={(event) => {
            const index = Math.round(event.nativeEvent.contentOffset.x / screenWidth);
            setActiveImageIndex(index);
          }}
        >
          {productImages.map((image, index) => (
            <Image
              key={`${product.id}-image-${index}`}
              source={{ uri: image }}
              style={[styles.heroImage, { width: screenWidth }]}
              resizeMode="cover"
            />
          ))}
        </ScrollView>

        <View style={styles.galleryFooter}>
          <View style={styles.indicatorRow}>
            {productImages.map((_, index) => (
              <View
                key={`indicator-${index}`}
                style={[
                  styles.indicator,
                  index === activeImageIndex && styles.indicatorActive,
                ]}
              />
            ))}
          </View>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.category}>{product.category}</Text>
        <Text style={styles.title}>{product.title}</Text>

        <View style={styles.metaRow}>
          <Text style={styles.rating}>★ {product.rating}</Text>
          <Text style={styles.stock}>{product.stock} available</Text>
        </View>

        <View style={styles.priceRow}>
          <Text style={styles.price}>${salePrice.toFixed(2)}</Text>
          <Text style={styles.comparePrice}>${product.price.toFixed(2)}</Text>
          <Text style={styles.discountBadge}>{product.discountPercentage}% OFF</Text>
        </View>

        <Text style={styles.description}>{product.description}</Text>

        <View style={styles.sectionBox}>
          <Text style={styles.sectionTitle}>Product details</Text>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Brand</Text>
            <Text style={styles.detailValue}>{product.brand}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Tags</Text>
            <Text style={styles.detailValue}>{product.tags.join(' / ')}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Shipping</Text>
            <Text style={styles.detailValue}>{product.shippingInformation}</Text>
          </View>
        </View>

        <View style={styles.sectionBox}>
          <Text style={styles.sectionTitle}>Dimensions</Text>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Width</Text>
            <Text style={styles.detailValue}>{product.dimensions.width} cm</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Height</Text>
            <Text style={styles.detailValue}>{product.dimensions.height} cm</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Depth</Text>
            <Text style={styles.detailValue}>{product.dimensions.depth} cm</Text>
          </View>
        </View>

        <ProductReviews product={product} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f1ee',
  },
  contentContainer: {
    paddingBottom: 32,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f4f1ee',
    padding: 24,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 15,
    color: '#374151',
  },
  errorText: {
    fontSize: 16,
    color: '#b91c1c',
    marginBottom: 16,
    textAlign: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 52,
    paddingBottom: 12,
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },
  iconText: {
    fontSize: 20,
    color: '#111827',
    fontWeight: '700',
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
  },
  galleryContainer: {
    backgroundColor: '#f8f3ef',
  },
  gallery: {
    width: '100%',
    height: 360,
    backgroundColor: '#f8f3ef',
  },
  galleryContent: {
    height: 360,
  },
  heroImage: {
    height: 360,
    backgroundColor: '#f8f3ef',
  },
  galleryFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: '#f8f3ef',
    marginTop: -1,
  },
  galleryHint: {
    color: '#6b7280',
    fontSize: 12,
    fontWeight: '600',
  },
  indicatorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 999,
    backgroundColor: '#d1d5db',
  },
  indicatorActive: {
    width: 20,
    backgroundColor: '#111827',
  },
  card: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 22,
    paddingBottom: 20,
  },
  category: {
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1,
    color: '#6b7280',
    marginBottom: 8,
  },
  title: {
    fontSize: 30,
    color: '#111827',
    fontWeight: '800',
    lineHeight: 36,
    marginBottom: 14,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  rating: {
    fontSize: 14,
    fontWeight: '700',
    color: '#111827',
  },
  stock: {
    fontSize: 13,
    color: '#4b5563',
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 10,
    marginBottom: 14,
    flexWrap: 'wrap',
  },
  price: {
    fontSize: 30,
    fontWeight: '800',
    color: '#111827',
  },
  comparePrice: {
    fontSize: 16,
    color: '#9ca3af',
    textDecorationLine: 'line-through',
  },
  discountBadge: {
    backgroundColor: '#111827',
    color: '#fff',
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 6,
    fontSize: 11,
    fontWeight: '700',
  },
  description: {
    fontSize: 15,
    color: '#4b5563',
    lineHeight: 24,
    marginBottom: 18,
  },
  sectionBox: {
    backgroundColor: '#f9fafb',
    borderRadius: 18,
    padding: 16,
    marginBottom: 14,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 10,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 5,
  },
  detailLabel: {
    color: '#6b7280',
    fontSize: 13,
  },
  detailValue: {
    color: '#111827',
    fontSize: 13,
    fontWeight: '600',
    textAlign: 'right',
    flexShrink: 1,
    maxWidth: '65%',
  },
  backButton: {
    backgroundColor: '#111827',
    borderRadius: 999,
    paddingHorizontal: 18,
    paddingVertical: 10,
  },
  backButtonText: {
    color: '#fff',
    fontWeight: '700',
  },
});
