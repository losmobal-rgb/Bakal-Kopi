document.addEventListener("alpine:init", () => {
    Alpine.data("products", () => ({
        items: [
            {
                id: 1,
                name: "Kopi Sachet",
                img: "produk.jpg",
                price: 25000,
                oldprice: 40000
            },
            {
                id: 2,
                name: "Mochi Anyaran",
                img: "mochi.jpg",
                price: 10000,
                oldprice: 20000
            },
            {
                id: 3,
                name: "Nutrijel rasa kopi",
                img: "tah.png",
                price: 4000,
                oldprice: 8000
            },
            {
                id: 4,
                name: "Permen Kopi",
                img: "permen.png",
                price: 8000,
                oldprice: 15000
            },
            {
                id: 5,
                name: "Macha Kemangi",
                img: "wangi.jpg",
                price: 25000,
                oldprice: 50000
            },
            {
                id: 6,
                name: "Macha Kelor",
                img: "macha.jpg",
                price: 20000,
                oldprice: 40000
            }
        ]
    }));

    Alpine.store("cart", {
        items: [],
        total: 0,
        quantity: 0,
        add(newItem) {
            const cartItem = this.items.find(item => item.id === newItem.id);

            if (!cartItem) {
                this.items.push({
                    ...newItem,
                    quantity: 1,
                    total: newItem.price
                });
                this.quantity++;
                this.total += newItem.price;
            } else {
                this.items = this.items.map(item => {
                    if (item.id !== newItem.id) {
                        return item;
                    } else {
                        item.quantity++;
                        item.total = item.price * item.quantity;
                        this.quantity++;
                        this.total += item.price;
                        return item;
                    }
                });
            }
        },
        remove(id) {
            // ambil item yang mau diremove berdasarkan idnya
            const cartItem = this.items.find(item => item.id == id);
            // jika item lebih dari satu
            if (cartItem.quantity > 1) {
                // telusuri 1 1
                this.items = this.items.map(item => {
                    // jika bukan barang yang dklik
                    if (item.id !== id) {
                        return item;
                    } else {
                        item.quantity--;
                        item.total = item.price * item.quantity;
                        this.quantity--;
                        this.total -= item.price;
                        return item;
                    }
                });
            } else if (cartItem.quantity === 1) {
                // jika barang nya sisa 1
                this.items = this.items.filter(item => item.id !== id);
                this.quantity--;
                this.total -= cartItem.price;
            }
        }
    });

    // ✅ Store untuk modal detail produk
    Alpine.store("modal", {
        open: false,
        item: null,
        show(item) {
            this.item = item;
            this.open = true;
            // render ulang feather icon (star, shopping-cart, dll)
            // setelah konten modal selesai dirender oleh Alpine
            Alpine.nextTick(() => {
                if (window.feather) {
                    feather.replace();
                }
            });
        },
        close() {
            this.open = false;
            this.item = null;
        }
    });
});

const rupiah = number => {
    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0
    }).format(number);
};