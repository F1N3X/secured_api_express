const axios = require("axios");

const SHOPIFY_ACCESS_TOKEN = process.env.SHOPIFY_TOKEN; // token d'accès API

exports.newCommande = async (req, res) => {
    const { items } = req.body;

    if (!items || !Array.isArray(items) || items.length === 0) {
        return res.status(400).json({ error: "Une liste d'articles est requise" });
    }

    try {
    
        // Pour chaque item : chercher le produit par titre
        for (const item of items) {
            const { title, quantity } = item;
            
            // Rechercher un produit avec ce titre
            const searchRes = await axios.get(
                `https://ldvoverwatch.myshopify.com/admin/api/2023-10/products.json?title=${encodeURIComponent(title)}`,
                {
                    headers: {
                        "X-Shopify-Access-Token": SHOPIFY_ACCESS_TOKEN,
                        "Content-Type": "application/json",
                    },
                    }
            );
        
            const foundProduct = searchRes.data.products[0];
            if (!foundProduct) {
                return res.status(404).json({ error: `Produit "${title}" introuvable dans Shopify` });
            }
        
        }
    
        
    } catch (error) {
        console.error("Erreur :", error.response?.data || error.message);
    }
};

