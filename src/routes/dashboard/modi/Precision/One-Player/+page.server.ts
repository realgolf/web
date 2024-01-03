import { User_Model } from "$lib/server/models";
import type { Actions } from "@sveltejs/kit";
import type { PageServerLoad } from "../$types";

export const load: PageServerLoad = async (event) => {
  const email = event.cookies.get("email");

  const user = await User_Model.findOne({ "user.email": email });

  if (!user) {
    return { status: 400, error: new Error("User could not be found") };
  } else {
    const measurement_unit = user.user?.measurement_units;
    return { measurement_unit };
  }
};

export const actions: Actions = {
  get_add_highscore: async (event) => {
    const email = event.cookies.get("email");
    const data = await event.request.formData();
    const highscore = data.get("shots") as unknown as number;

    console.log(highscore);

    try {
      const user = await User_Model.findOne({ "user.email": email });

      if (!user) {
        return {
          status: 404,
          error: "User not found",
        };
      }

      if (user.one_player_precision_highscore) {
        if (!user.one_player_precision_highscore?.daily) {
          user.one_player_precision_highscore.daily = highscore;
        } else if (user.one_player_precision_highscore?.daily > highscore) {
          throw new Error("The Highsore is smaller then todays highscore");
        }
        if (!user.one_player_precision_highscore.weekly) {
          user.one_player_precision_highscore.weekly = highscore;
        } else if (user.one_player_precision_highscore.weekly > highscore) {
          throw new Error("The Highsore is smaller then the weekly highscore");
        }

        if (!user.one_player_precision_highscore.monthly) {
          user.one_player_precision_highscore.monthly = highscore;
        } else if (user.one_player_precision_highscore.monthly > highscore) {
          throw new Error("The Highsore is smaller then the monthly highscore");
        }

        if (!user.one_player_precision_highscore.yearly) {
          user.one_player_precision_highscore.yearly = highscore;
        } else if (user.one_player_precision_highscore.yearly > highscore) {
          throw new Error("The Highsore is smaller then the yearly highscore");
        }

        console.log(user);
      }
    } catch (error) {
      console.error(error);
      return {
        status: 500,
        error: error,
      };
    }
  },
};
