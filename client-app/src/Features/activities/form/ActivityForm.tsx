import React, { FormEvent, useEffect, useState } from "react";
import { Segment, Form, Button, Icon, Grid } from "semantic-ui-react";
import { IActivity } from "../../../App/models/activity";
import { v4 as uuid } from "uuid";
import ActivityStore from "../../../App/stores/ActivityStore";
import { observer } from "mobx-react-lite";
import { RouteComponentProps } from "react-router-dom";
import { Form as FinalForm, Field } from "react-final-form";
import { TextInput } from "../../../App/common/form/TextInput";
import { TextAreaInput } from "../../../App/common/form/TextAreaInput";
import { SelectInput } from "../../../App/common/form/SelectInput";
import { category } from "../../../App/common/options/categoryOptions";
import { DateInput } from "../../../App/common/form/DateInput";

interface DetailsParams {
  id: string;
}

export const ActivityForm: React.FC<
  RouteComponentProps<DetailsParams>
> = observer(({ match, history }) => {
  const {
    activity: initialFormState,
    loadActivity,
    clearActivity,
  } = ActivityStore;

  const [activity, setActivity] = useState<IActivity>({
    id: "",
    title: "",
    category: "",
    description: "",
    date: "",
    city: "",
    venue: "",
  });

  useEffect(() => {
    if (match.params.id && activity.id.length === 0) {
      loadActivity(match.params.id).then(
        () => initialFormState && setActivity(initialFormState)
      );
    }

    return () => {
      clearActivity();
    };
  }, [
    loadActivity,
    clearActivity,
    match.params.id,
    initialFormState,
    activity.id.length,
  ]);

  const handleFinalFormSubmit = (values: any) => {
    console.log(values);
  };

  // const handleSubmit = () => {
  //   if (checkIfActivityIsNew()) {
  //     let newActivity = {
  //       ...activity,
  //       id: uuid(),
  //     };
  //     ActivityStore.createActivity(newActivity).then(() =>
  //       history.push(`/activities/${newActivity.id}`)
  //     );
  //   } else {
  //     ActivityStore.editActivity(activity).then(() =>
  //       history.push(`/activities/${activity.id}`)
  //     );
  //   }
  // };

  const redirectFromForm = () => {
    checkIfActivityIsNew()
      ? history.push("/activities")
      : history.push(`/activities/${activity.id}`);
  };

  const checkIfActivityIsNew = () => {
    return activity!.id.length === 0;
  };

  return (
    <Grid>
      <Grid.Column width={10}>
        <React.Fragment>
          <Icon
            onClick={redirectFromForm}
            name="arrow alternate circle left outline"
            size="big"
            style={{ marginBottom: "10px", cursor: "pointer" }}
          />
          <Segment clearing>
            <FinalForm
              onSubmit={handleFinalFormSubmit}
              render={({ handleSubmit }) => (
                <Form onSubmit={handleSubmit}>
                  <Field
                    name="title"
                    placeholder="Title"
                    value={activity.title}
                    component={TextInput}
                  />
                  <Field
                    name="description"
                    rows={3}
                    placeholder="Description"
                    value={activity.description}
                    component={TextAreaInput}
                  />
                  <Field
                    name="category"
                    placeholder="Category"
                    options={category}
                    value={activity.category}
                    component={SelectInput}
                  />
                  <Field
                    name="date"
                    placeholder="Date"
                    value={activity.date}
                    component={DateInput}
                  />
                  <Field
                    name="city"
                    placeholder="City"
                    value={activity.city}
                    component={TextInput}
                  />
                  <Field
                    name="venue"
                    placeholder="Venue"
                    value={activity.venue}
                    component={TextInput}
                  />
                  <Button
                    loading={ActivityStore.submitting}
                    floated="right"
                    inverted
                    secondary
                    content="Submit"
                  />
                </Form>
              )}
            ></FinalForm>
          </Segment>
        </React.Fragment>
      </Grid.Column>
    </Grid>
  );
});
