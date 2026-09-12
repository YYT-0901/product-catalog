import { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from 'react-native';

import { fetchProducts } from '@/api/productApi';
import ProductCard from '@/components/product-card';
import type { Product } from '@/models/product';

export default function Page() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isCancelled = false;

    async function loadProducts() {
      try {
        const response = await fetchProducts(0, 20);

        if (!isCancelled) {
          const nextProducts = response?.products ?? [];
          setProducts(nextProducts);
          setError(nextProducts.length ? null : 'No product data returned from API.');
        }
      } catch (err) {
        if (!isCancelled) {
          setError(err instanceof Error ? err.message : 'Failed to load product.');
          setProducts([]);
        }
      } finally {
        if (!isCancelled) {
          setIsLoading(false);
        }
      }
    }

    loadProducts();

    return () => {
      isCancelled = true;
    };
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.intro}>
        <Text style={styles.heading}>
          Good goods,{"\n"}Good life.
        </Text>
      </View>

      <View style={styles.previewPanel}>
        {isLoading ? (
          <View style={styles.loadingRow}>
            <ActivityIndicator size="small" color="#111827" />
            <Text style={styles.loadingText}>Loading products…</Text>
          </View>
        ) : error ? (
          <Text style={styles.errorText}>{error}</Text>
        ) : (
          <View style={styles.productList}>
            {products.map((item, index) => (
              <View key={`${item.title}-${index}`} style={styles.cardItem}>
                <ProductCard item={item} />
              </View>
            ))}
          </View>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 48,
    paddingBottom: 40,
    backgroundColor: '#f4f1ee',
  },
  intro: {
    marginBottom: 24,
  },
  heading: {
    fontSize: 36,
    fontWeight: '700',
    lineHeight: 42,
    color: '#111827',
    marginBottom: 12,
    textAlign: 'center',
    letterSpacing: -0.5,
    fontFamily: 'Inter_700Bold',
  },
  previewPanel: {
    backgroundColor: '#ffffff',
    borderRadius: 24,
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 8 },
    elevation: 3,
  },
  productList: {
    gap: 18,
  },
  cardItem: {
    width: '100%',
  },
  loadingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 12,
  },
  loadingText: {
    fontSize: 14,
    color: '#374151',
  },
  errorText: {
    color: '#b91c1c',
    fontSize: 15,
    paddingVertical: 10,
  },
});
