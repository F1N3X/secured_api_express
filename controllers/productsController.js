const axios = require("axios");
const supabase = require('../supabaseClient');

const SHOPIFY_ACCESS_TOKEN = process.env.SHOPIFY_TOKEN; // token d'accès API

exports.getProducts = async (req, res) => {
    try {
        console.log("TOKEN:", SHOPIFY_ACCESS_TOKEN);

        const response = await axios.get(
            `https://ldvoverwatch.myshopify.com/admin/api/2024-10/products.json`,
            {
                headers: {
                    "X-Shopify-Access-Token": SHOPIFY_ACCESS_TOKEN,
                    "Content-Type": "application/json",
                },
            }
        );

        res.json(response.data);
    } catch (error) {
        console.error("Erreur Shopify:", error.response?.data || error.message);
        res
            .status(500)
            .json({ error: "Erreur lors de la récupération des produits" });
    }
}

exports.createProduct = async (req, res) => {
    const { title, price } = req.body;

    console.log(req.user.id + " a créé un produit");

    if (!title || !price) {
        return res.status(400).json({ error: "Le nom et le prix du produit sont requis" });
    }

    try {
        const response = await axios.post(
            `https://ldvoverwatch.myshopify.com/admin/api/2024-10/products.json`,
            {
                product: {
                    title,
                    variants: [
                        {
                          price: price.toString() // Shopify attend une string pour le prix
                        }
                    ]
                }
            },
            {
                headers: {
                    "X-Shopify-Access-Token": SHOPIFY_ACCESS_TOKEN,
                    "Content-Type": "application/json",
                },
            }
        );

        const shopifyProduct = response.data.product;

        const { data, error } = await supabase
        .from('products')
        .insert([
            {
              shopify_id: shopifyProduct.id,
              created_by: req.user.id,
              sales_count: 0
            }
        ]);

        if (error) {
        console.error('Erreur Supabase:', error);
        return res.status(500).json({ error: "Erreur lors de l'enregistrement en base" });
        }

        res.status(201).json({
        message: "Produit créé avec succès",
        product: shopifyProduct,
        db_entry: data,
        });
        
    } catch (error) {
        console.error("Erreur Shopify:", error.response?.data || error.message);
        res.status(500).json({ error: "Erreur lors de la création du produit" });
    }
};

