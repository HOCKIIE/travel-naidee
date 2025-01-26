import { Request,Response } from "express";
import { Trips }  from "../assets/Trips";

interface Types {
    req: {keyword:String}; res: Response;
}

export const TripCtrl = (req:Request,res:Response) => {
    try{
        const { keyword } = req.query;

        if (!keyword || typeof keyword !== "string" || keyword.trim() === "") {
            return res.status(200).json({ success: true, data: Trips });
          }

          
        const toLower = keyword.toLowerCase();
        const filteredTrips = Trips.filter((trip) =>
            trip.title.toLowerCase().includes(toLower) ||
            trip.tags.some((tag) => tag.toLowerCase().includes(toLower))
        );
        return res.status(200).json({ success: true, data: filteredTrips });
    } catch {
        console.error();
    }
}