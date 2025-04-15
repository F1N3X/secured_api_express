const axios = require("axios");

const SHOPIFY_SECRET_KEY = process.env.SHOPIFY_SECRET_KEY; // token d'accès API

exports.newCommande = async (req, res) => {
    const { body } = req.body;
    const hmacHeader = req.get('X-Shopify-Hmac-Sha256');

    const generatedHash = crypto
    .createHmac('sha256', SHOPIFY_SECRET_KEY)
    .update(body, 'utf8')
    .digest('base64');

    if (hmacHeader !== generatedHash) {
        return res.status(401).json({ error: "Signature invalide" });
    }
    if (!body) {
        return res.status(400).json({ error: "Une liste d'articles est requise" });
    }
    const items = body.line_items;
    try {
    
        // Pour chaque item : chercher le produit par titre
        for (const item of items) {
            const { title, quantity } = item;
            
        
        }
    
        
    } catch (error) {
        console.error("Erreur :", error.response?.data || error.message);
    }
};

