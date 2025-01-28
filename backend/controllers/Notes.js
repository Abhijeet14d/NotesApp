import NotesModel from "../models/Notes.js";

const createNotes = async (req, res) => {
    try {
        const userId = req.userId;
        const { title } = req.body;
        if(!title) {
            return res.status(400).json({ message: "Title is required" });
        }
        const CreateNotes = new NotesModel({
            title,
            userId:userId
        })
        await CreateNotes.save();
        res.status(201).json({ message: "Notes created successfully" });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

const UpdateNotes = async (req, res) => {
    try {
        const userId = req.userId;
        const NotesId = req.params.id;  
        const { title } = req.body;
        const findNotes = await NotesModel.findById({_id:NotesId});
        if(!findNotes) {
            return res.status(404).json({ message: "Notes not found" });
        }
        const NotesUserId = findNotes.userId.toString();
        if(userId.toString() !== NotesUserId) {
            return res.status(401).json({ message: "You are not authorized to update this notes" });
        }
        console.log("NotesUSerId", NotesUserId);
        res.status(201).json({ message: "Notes updated successfully" });
        
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export { createNotes, UpdateNotes };