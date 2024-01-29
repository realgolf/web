import { User_Model } from "$lib/server/models";
import { formattedTime, today } from "$lib/shared/time";
import { redirect, type Actions } from "@sveltejs/kit";
import { v4 as uuidv4 } from "uuid";

export const actions: Actions = {
  add_course: async (event) => {
    const email = event.cookies.get("email");

    const data = await event.request.formData();
    console.log(data);
    const course_name = data.get("course_name") as unknown as string;
    const course_location = data.get("course_location") as unknown as string;
    const course_par = data.get("course_par") as unknown as number;
    const course_rating = data.get("course_rating") as unknown as string;
    const playing_partner = data.get("playing_partner") as string;
    const validCourseRating = parseFloat(course_rating.replace(",", "."));
    console.log(
      course_name,
      course_location,
      validCourseRating,
      course_par,
      playing_partner
    );
    let partners: string[] = [];

    try {
      const user = await User_Model.findOne({ "user.email": email });

      if (!user) {
        return {
          status: 404,
          body: JSON.stringify({ error: "User not found" }),
        };
      }

      //Generate a unique ID for a round
      const roundId = uuidv4();

      if (playing_partner) {
        partners = playing_partner.split(", ");
      }

      if (user.golf_round) {
        user.golf_round.push({
          id: roundId,
          course: {
            name: course_name,
            location: course_location,
            coursePar: course_par,
            courseRating: validCourseRating,
          },
          roundInfo: {
            date: today,
            time: formattedTime,
            playingPartners: partners,
          },
        });
      }

      await user.save();
      throw redirect(302, "/dashboard/score/play");
    } catch (error) {
      console.error(error);
      return {
        status: 500,
        body: JSON.stringify({ error: "Error saving game" }),
      };
    }
  },
};
