#include <stdio.h>
#include <string.h>
#include <math.h>

int main()
{
    char num_str[11]; // Max 10 digits + null terminator
    scanf("%s", num_str);

    int n = strlen(num_str); // Number of digits
    int num = 0;

    // Convert string to integer
    for (int i = 0; i < n; i++)
    {
        num = num * 10 + (num_str[i] - '0');
    }

    // Calculate sum of nth powers of each digit
    int sum = 0;
    for (int i = 0; i < n; i++)
    {
        int digit = num_str[i] - '0';
        sum += pow(digit, n);
    }

    // Check if Armstrong
    if (sum == num)
    {
        printf("Armstrong");
    }
    else
    {
        printf("Not Armstrong");
    }

    return 0;
}
}
}
}
}
}