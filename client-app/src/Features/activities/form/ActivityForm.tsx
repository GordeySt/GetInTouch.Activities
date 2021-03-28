import React, { useEffect, useState } from "react";
import { Segment, Button, Icon, Grid, Header } from "semantic-ui-react";
import { ActivityFormValues, IActivity } from "../../../App/models/activity";
import { v4 as uuid } from "uuid";
import { useStore } from "../../../App/stores/Store";
import { observer } from "mobx-react-lite";
import { useHistory, useParams } from "react-router-dom";
import { TextInput } from "../../../App/common/form/TextInput";
import { TextArea } from "../../../App/common/form/TextArea";
import { SelectInput } from "../../../App/common/form/SelectInput";
import { categoryOptions } from "../../../App/common/options/categoryOptions";
import { DateInput } from "../../../App/common/form/DateInput";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { LoadingComponent } from "../../../App/layout/LoadingComponent";

export const ActivityForm: React.FC = observer(() => {
  const { activityStore } = useStore();
  const { loadActivity, loadingInitial, submitting } = activityStore;
  const { id } = useParams<{ id: string }>();
  const history = useHistory();

  const [activity, setActivity] = useState(new ActivityFormValues());

  const validationSchema = Yup.object({
    title: Yup.string().required("The activity title is required"),
    description: Yup.string().required("The activity description is required"),
    category: Yup.string().required(),
    date: Yup.string().required().nullable(),
    venue: Yup.string().required(),
    city: Yup.string().required(),
  });

  useEffect(() => {
    if (id) {
      loadActivity(id).then((activity) =>
        setActivity(new ActivityFormValues(activity))
      );
    }
  }, [loadActivity, id]);

  const handleSubmit = (values: IActivity) => {
    if (!activity.id) {
      let newActivity = {
        ...values,
        id: uuid(),
      };
      activityStore.createActivity(newActivity);
    } else {
      activityStore.editActivity(values);
    }
  };

  const redirectFromForm = () => {
    !activity.id
      ? history.push("/activities")
      : history.push(`/activities/${activity.id}`);
  };

  if (loadingInitial) return <LoadingComponent />;

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
            <Header
              content="Activity Details"
              sub
              color="black"
              style={{ marginBottom: "10px" }}
            />
            <Formik
              validationSchema={validationSchema}
              enableReinitialize
              initialValues={activity}
              onSubmit={(values) => handleSubmit(values)}
            >
              {({ handleSubmit, isValid, isSubmitting, dirty }) => (
                <Form
                  onSubmit={handleSubmit}
                  autoComplete="off"
                  className="ui form"
                >
                  <TextInput name="title" placeholder="Title" />
                  <TextArea
                    rowsize={4}
                    name="description"
                    placeholder="Description"
                  />
                  <SelectInput
                    name="category"
                    placeholder="Category"
                    options={categoryOptions}
                  />
                  <DateInput
                    name="date"
                    placeholderText="Date"
                    showTimeSelect
                    timeCaption="time"
                    dateFormat="MMMM d, yyyy h:mm aa"
                  />
                  <Header
                    content="Location Details"
                    sub
                    color="black"
                    style={{ marginBottom: "10px" }}
                  />
                  <TextInput name="city" placeholder="City" />
                  <TextInput name="venue" placeholder="Venue" />
                  <Button
                    disabled={isSubmitting || !dirty || !isValid}
                    loading={submitting}
                    floated="right"
                    type="submit"
                    secondary
                    content="Submit"
                  />
                </Form>
              )}
            </Formik>
          </Segment>
        </React.Fragment>
      </Grid.Column>
    </Grid>
  );
});
