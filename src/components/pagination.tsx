import { Pressable, StyleSheet, Text, View } from 'react-native';

import { Button } from '@/components/ui/button';

type PaginationProps = {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export function Pagination({ page, totalPages, onPageChange }: PaginationProps) {
  const canGoPrev = page > 1;
  const canGoNext = page < totalPages;

  const getVisiblePages = () => {
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, index) => index + 1);
    }

    const pages: Array<number | 'ellipsis'> = [];
    const siblingCount = 1;

    let start = Math.max(1, page - siblingCount);
    let end = Math.min(totalPages, page + siblingCount);

    if (page <= 3) {
      start = 1;
      end = 5;
    }

    if (page >= totalPages - 2) {
      start = totalPages - 4;
      end = totalPages;
    }

    if (start > 1) {
      pages.push(1, 'ellipsis');
    } else {
      pages.push(1);
    }

    for (let i = start; i <= end; i += 1) {
      if (i !== 1 && i !== totalPages) {
        pages.push(i);
      }
    }

    if (end < totalPages) {
      pages.push('ellipsis', totalPages);
    } else if (totalPages !== 1) {
      pages.push(totalPages);
    }

    return pages;
  };

  const visiblePages = getVisiblePages();

  return (
    <View style={styles.container}>
      <Button
        variant="outline"
        size="sm"
        disabled={!canGoPrev}
        onPress={() => canGoPrev && onPageChange(page - 1)}
        style={styles.arrowButton}
      >
        ←
      </Button>

      {visiblePages.map((item, index) => {
        if (item === 'ellipsis') {
          return (
            <Text key={`ellipsis-${index}`} style={styles.ellipsis}>
              ...
            </Text>
          );
        }

        const isCurrent = item === page;

        return (
          <Pressable
            key={item}
            accessibilityRole="button"
            onPress={() => onPageChange(item)}
            style={[styles.pageButton, isCurrent && styles.pageButtonActive]}
          >
            <Text style={[styles.pageButtonText, isCurrent && styles.pageButtonTextActive]}>{item}</Text>
          </Pressable>
        );
      })}

      <Button
        variant="outline"
        size="sm"
        disabled={!canGoNext}
        onPress={() => canGoNext && onPageChange(page + 1)}
        style={styles.arrowButton}
      >
        →
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    marginTop: 18,
    paddingVertical: 8,
    flexWrap: 'wrap',
  },
  arrowButton: {
    minWidth: 40,
    paddingHorizontal: 10,
    backgroundColor: '#111827',
    borderColor: '#f8f3ef',
  },
  pageButton: {
    minWidth: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: '#f3f4f6',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 8,
  },
  pageButtonActive: {
    backgroundColor: '#111827',
  },
  pageButtonText: {
    color: '#111827',
    fontSize: 13,
    fontWeight: '700',
  },
  pageButtonTextActive: {
    color: '#fff',
  },
  ellipsis: {
    width: 24,
    textAlign: 'center',
    color: '#6b7280',
    fontSize: 14,
    fontWeight: '700',
  },
});

export default Pagination;
