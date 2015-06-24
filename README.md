# Backbase Training Exercises

## Portal Frontend - Module 1: Widget Development

Everything you need to know about widgets - the digital building blocks of any application built with Backbase Portal. You will learn about the concepts behind Backbase widgets, how to create a widget from scratch, giving them rich functionality and styling them according to Backbase best practices.

### Contents

 - **pf1e1**: Create your first widget ([solution](cxp-fe-training-01/src/main/webapp/static/cxp-fe-training-01/widgets/pf1e1-todo-widget))
 - **pf1e2**: Create the todo application ([solution](cxp-fe-training-01/src/main/webapp/static/cxp-fe-training-01/widgets/pf1e2-todo-widget))
 - **pf1ex3a**: Use widget preferences ([solution](cxp-fe-training-01/src/main/webapp/static/cxp-fe-training-01/widgets/pf1e3a-todo-widget))
 - **pf1ex3b**: Make your widget responsive ([solution](cxp-fe-training-01/src/main/webapp/static/cxp-fe-training-01/widgets/pf1e3b-todo-widget))
 - **pf1ex3c**: Enable widget communication via PubSub ([solution](cxp-fe-training-01/src/main/webapp/static/cxp-fe-training-01/widgets/pf1e3c-todo-widget))
 - **pf1ex4**: Style your widget ([solution](cxp-fe-training-01/src/main/webapp/static/cxp-fe-training-01/widgets/pf1e4-todo-widget))

### Installation & Configuration

 - Copy and paste the **cxp-fe-training-01** folder in the **statics/bundles** folder of your Launchpad 0.12.x project
 - Add the bundle resource base in **portal/pom.xml**, e.g.:

```xml
<resourceBases>
    <resourceBase>${statics.dir}/bundles/cxp-fe-training-01/src/main/webapp</resourceBase>
    <resourceBase>${project.basedir}/src/main/webapp</resourceBase>
    <resourceBase>${work.dir}</resourceBase>
</resourceBases>
```
