const asyncHandler = require("express-async-handler")
const generateToken = require("../config/generateToken")
const Enfant = require("../models/enfantModel")
const Traitement = require("../models/traitementModel")


const ajouterEnfant = asyncHandler(async (req, res) => { 
    const { firstName, lastName, parentPhone, address, age, typeCancer, status ,codeEnfant} = req.body
    
    if (!firstName || !lastName || !parentPhone || !address) {
        res.status(400)
        throw new Error("Entrer toutes ses données")
    }
    const enfantExits = await Enfant.findOne({ codeEnfant: codeEnfant })
    if (enfantExits) {
        res.status(401)
        throw new Error("Ce code d'enfant existe déja")
    }
    const enfant = await Enfant.create({
        firstName,
        lastName,
        address,
        status,
        typeCancer,
        parentPhone,
        age,
        codeEnfant
    })

   if (enfant) {
        res.status(200).json({
            "Message" : "Enfant créé"
        })
    }
    else {
        res.status(400)
        throw new Error('Failed to create the child')
    }

})

const ajouterTraitementEnfant = asyncHandler(async (req, res) => {
    const { idEnfant, medicament, type, codeTraitement, montant } = req.body
    
    const enfant = await Enfant.findById({ "_id": idEnfant })
    if (!enfant) {
         res.status(401)
        throw new Error("Enfant introuvable")
    }
    else {
        const traitement = await Traitement.create(
            {
                enfant,
                medicament,
                type,
                codeTraitement,
                montant
            }
        )
        if (traitement) {
            res.status(200).json({
                "message" : "traitement créé !!!"
            })
        }
        else {
            res.status(401)
            throw new Error("Impossible de créer ce traitement")
        }
    }
 })

const trouverEnfantByCodeEnfant = asyncHandler(async (req, res) => {
    const { codeEnfant } = req.body
    const enfant = await Enfant.findOne({ codeEnfant: codeEnfant })
    if (enfant) {
        res.status(200).json({
            _id: enfant._id,
            codeEnfant : enfant.codeEnfant ,
            firstName: enfant.firstName,
            lastName: enfant.lastName,
            parentPhone: enfant.parentPhone,
            address: enfant.address,
            age: enfant.age,
            typeCancer: enfant.typeCancer,
            status : enfant.status
        })
    }
})
 
const tousLesTraitementEnfant = asyncHandler(async (req, res) => {
    
   try {
        const traitements = await Traitement.find({ enfant: req.params.idEnfant })
        res.json(traitements)
    } catch (error) {
        res.status(400)
        throw new Error(error.message)
    }
})

const traitementEnfantEnCours = asyncHandler(async (req, res) => { 
    try {
        const traitement = await Traitement.findOne({ enfant: req.params.idEnfant, status:"ouvert" })
        res.json(traitement)
    } catch (error) {
        res.status(400)
        throw new Error(error.message)
    } 
})

const ajouterRaisonCloture = asyncHandler(async (req, res) => {
    const { raisonCloture, idTraitement } = req.body
    const traitement = await Traitement.findById({ "_id": idTraitement })
    if (!traitement) {
        res.status(401)
        throw new Error("Traitement non trouvé")
    }
    else {
        const updateTraitement = await Traitement.findByIdAndUpdate(
            idTraitement,
            {
                raisonCloture: raisonCloture,
                status:"ferme"
            },
            {
                new:true
            }
        )
        if (updateTraitement) {
            res.status(200).json({
                "message" : "Raison de cloture bien enregistré"
            })
        }
        else {
            res.status(401)
            throw new Error("raison de cloture non enregistré")
        }
    }
})

const continuerTraitement = asyncHandler(async (req, res) => { 

    const idTraitement = req.params.idTraitement
    const traitement = await Traitement.findById({ "_id": idTraitement })
    if (traitement) {
        const updateTraitement = await Traitement.findByIdAndUpdate(
            idTraitement,
            {
                status:"ouvert"
            },
            {
                new:true
            }
        )
        if (updateTraitement) {
            res.status(200).json({
                "message" : "traitement ouvert"
            })
        }
        else {
            res.status(401)
            throw new Error("traitement non ouvert")
        }
    }
    else {
        res.status(401)
        throw new Error("Traitement non trouvé")
    }
})
 
module.exports = {
    ajouterEnfant, ajouterTraitementEnfant,tousLesTraitementEnfant,continuerTraitement,
    trouverEnfantByCodeEnfant,ajouterRaisonCloture,traitementEnfantEnCours
}