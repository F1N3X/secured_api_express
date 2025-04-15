const crypto = require('crypto');
const supabase = require("../supabaseClient");

const SHOPIFY_SECRET_KEY = process.env.SHOPIFY_SECRET_KEY; 

exports.newCommande = async (req, res) => {
    const body = req.body;
    const hmacHeader = req.get('x-shopify-hmac-sha256');

    const generatedHash = crypto
        .createHmac('sha256', SHOPIFY_SECRET_KEY)
        .update(`${body}`)
        .digest('base64');

    if (hmacHeader !== generatedHash) {
        return res.status(401).json({ error: "Signature invalide" });
    }
    if (!body) {
        return res.status(400).json({ error: "Une liste d'articles est requise" });
    }
    const items = body.line_items;
    try {
        for (const item of items) {
            const { id, quantity } = item;
            const { data, error: fetchError } = await supabase
                .from('products')
                .select('sales_count')
                .eq('shopify_id', id)
                .single();

            await supabase 
                    .from("products")
                    .update({ sales_count: data.sales_count + quantity })
                    .eq('shopify_id', id);
        }
    
        return res.status(200).json({ message: "Commande traitée avec succès" });
    } catch (error) {
        console.error("Erreur :", error.response?.data || error.message);
    }
};

