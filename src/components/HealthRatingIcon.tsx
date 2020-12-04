import React from "react";
import { Icon } from "semantic-ui-react";
import { HealthCheckRating } from "../types";

const HealthRatingIcon: React.FC<({ rating: HealthCheckRating })> = ({ rating }) => {
  switch (rating) {
    case 0:
      return <Icon color="green" name="heart" size="small" />
    case 1:
      return <Icon color="yellow" name="heart" size="small" />
    case 2:
      return <Icon color="orange" name="heart" size="small" />
    case 3:
      return <Icon color="red" name="heart" size="small" />
    default:
      console.error("HealthCheckRating wrong type " + rating);
      return null;
  }
};

export default HealthRatingIcon;