const express = require('express')
const { ajouterEnfant, trouverEnfantByCodeEnfant,
    ajouterTraitementEnfant, tousLesTraitementEnfant,
    ajouterRaisonCloture, traitementEnfantEnCours,continuerTraitement } = require('../controllers/enfantController')
const { protect } = require('../middleware/authMiddleware')

const router = express.Router()

router.route('/').post(protect,ajouterEnfant)
router.route('/trouver-enfant').post(protect,trouverEnfantByCodeEnfant)
router.route('/ajouter-traitement').post(protect,ajouterTraitementEnfant)
router.route('/traitements/:idEnfant').get(protect,tousLesTraitementEnfant)
router.route('/traitements/ajouter-raison-cloture').post(protect,ajouterRaisonCloture)
router.route('/traitements/traitement-encours/:idEnfant').get(protect,traitementEnfantEnCours)
router.route('/traitements/ouvrir-traitement/:idTraitement').get(protect,continuerTraitement)



module.exports = router