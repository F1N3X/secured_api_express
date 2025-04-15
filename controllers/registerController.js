const supabase = require('../supabaseClient');
const bcrypt = require('bcrypt');

exports.register = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ error: 'Tous les champs sont requis' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const { data, error } = await supabase
      .from('users')
      .insert([{ name, email, password: hashedPassword }]);

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    res.status(201).json({ message: 'Utilisateur créé avec succès'});

  } catch (err) {
    console.error('Registration error:', err);
    res.status(500).json({ 
      error: 'Erreur serveur', 
      details: err.message || 'Aucun détail disponible'
    });
  }
};
