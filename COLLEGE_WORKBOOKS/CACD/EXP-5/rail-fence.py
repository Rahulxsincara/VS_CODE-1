def encrypt(text, rails):

    fence = []

    for i in range(rails):
        fence.append("")

    row = 0
    direction = 1

    for char in text:

        fence[row] = fence[row] + char

        if row == 0:
            direction = 1

        elif row == rails - 1:
            direction = -1

        row = row + direction

    result = ""

    for rail in fence:
        result = result + rail

    return result


rails = 5

messages = input("Enter the plaintext: ")

ciphertext = encrypt(messages, rails)

print("Ciphertext:", ciphertext)