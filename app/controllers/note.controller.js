const Note = require('../models/note.model.js');

exports.create = (req,res) => {
if(!req.body.content){
    return res.status(400).send({
        message: "Cannot be empty"
    });
}

const note = new Note({
    title: req.body.title || "Untitled",
    content: req.body.content
});

note.save().then( data =>{
    res.send(data);
}).catch(err=>{
    res.status(500).send({
        message: err.message || "Some error"
    });
});
};

exports.findAll = (req,res) => {
    Note.find().then( data =>{
        res.send(data);
    }).catch(err=>{
        res.status(500).send({
            message: err.message || "Some error"
        });
    });
};

exports.findOne = (req,res) => {

    Note.findById(req.params.noteId).then( data =>{
        if(!data){
            return res.status(404).send({
                message: "No not found with id" + req.params.noteId
            });
        }
        res.send(data);
    }).catch(err=>{
        if(err.kind === 'ObjectId'){
            return res.status(404).send({
                message: "No not found with id" + req.params.noteId
            })
        }
        res.status(500).send({
            message: err.message || "Some error" + req.params.noteId
        });
    });
};

exports.update = (req,res) => {
    if(!req.body.content){
        return res.status(400).send({
            message: "Cannot be empty"
        });
    }
    
    Note.findByIdAndUpdate(req.params.noteId,{
        title: req.body.title || 'Untitled',
        content: req.body.content
    }, {new:true}).then(data=>{
        if(!data) {
            return res.status(404).send({
                message:"Note not found with Id" + req.params.noteId
            });
        }
        res.send(data);
    }).catch(err=>{
        if(err.kind === 'ObjectId'){
            return res.status(404).send({
                message: "Note not found"
            });
        }
        return res.status(500).send({
            message: "Error updating"
        });
    });
};

exports.delete = (req,res) => {
    Note.findByIdAndRemove(req.params.noteId).then(data=>{
        if(!data) {
            return res.status(404).send({
                message:"Note not found with Id" + req.params.noteId
            });
        }
        res.send("Deleted successfully");
    }).catch(err=>{
        if(err.kind === 'ObjectId' || err.name === 'NotFound'){
            return res.status(404).send({
                message: "Note not found"
            });
        }
        return res.status(500).send({
            message: "Error deleting"
        });
    })
};
