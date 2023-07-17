const mongoose = require('mongoose')


const TraitementSchema = new mongoose.Schema({
    enfant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Enfant"
    },
    medicament: {
        type : [String]
    },
    type: {
        type : String
    },
    resultat: {
        type: String
    }, 
    raisonCloture: {
        type: String
    },
    status: {
        type: String, default:"ouvert"
    },
    codeTraitement: {
        type: String
    },
    montant: {
        type: Number
    },
},
    {timestamps:true}
)


const Traitement = mongoose.model("Traitement", TraitementSchema)

module.exports =  Traitement