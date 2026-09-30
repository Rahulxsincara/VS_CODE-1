#include <stdio.h>

int main(void) {
    int n;
    if (scanf("%d", &n) != 1 || n <= 0) {
        return 0;
    }
    
    // Upper half (including middle)
    for (int i = 1; i <= n; i++) {
        // Spaces before
        for (int s = 1; s <= n - i; s++) {
            putchar(' ');
        }
        // Numbers ascending then descending
        for (int j = 1; j <= i; j++) {
            printf("%d", j);
        }
        for (int j = i - 1; j >= 1; j--) {
            printf("%d", j);
        }
        putchar('\n');
    }
    
    // Lower half (excluding middle)
    for (int i = n - 1; i >= 1; i--) {
        // Spaces before
        for (int s = 1; s <= n - i; s++) {
            putchar(' ');
        }
        // Numbers ascending then descending
        for (int j = 1; j <= i; j++) {
            printf("%d", j);
        }
        for (int j = i - 1; j >= 1; j--) {
            printf("%d", j);
        }
        putchar('\n');
    }
    
    return 0;
}
