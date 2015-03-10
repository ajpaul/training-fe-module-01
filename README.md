# Backbase Training Exercise

## Portal Frontend - Module 1: Widget Development

Everything you need to know about widgets - the digital building blocks of any application built with Backbase Portal. You will learn about the concepts behind Backbase widgets, how to create a widget from scratch, giving them rich functionality and styling them according to Backbase best practices.

### Contents

 - **pf1e1**: Create your first widget ([solution](cxp-fe-training-01/src/main/webapp/static/cxp-fe-training-01/widgets/pf1e1-todo))
 - **pf1e2a**: Setup your widget development ([solution](cxp-fe-training-01/src/main/webapp/static/cxp-fe-training-01/widgets/pf1e2a-todo))
 - **pf1e2b**: Create the todo application ([solution](cxp-fe-training-01/src/main/webapp/static/cxp-fe-training-01/widgets/pf1e2b-todo))
 - **pf1ex3**: Enhance your widget ([solution](cxp-fe-training-01/src/main/webapp/static/cxp-fe-training-01/widgets/pf1e3-todo))
 - **pf1ex4**: Style your widget ([solution](cxp-fe-training-01/src/main/webapp/static/cxp-fe-training-01/widgets/pf1e4-todo))

### Installation & Configuration

 - Copy and paste the **cxp-fe-training-01** folder in the **bundles** folder of your Launchpad 0.11.x project
 - If it is not already there, add the `bundles.dir` property as a new property in **portalserver/pom.xml**:

```xml
<bundles.dir>${project.parent.basedir}/bundles</bundles.dir>
```

 - Add the bundle resource base in **portalserver/pom.xml**, e.g.:

```xml
<resourceBases>
    <resourceBase>${bundles.dir}/cxp-fe-training-01/src/main/webapp</resourceBase>
    <resourceBase>${project.basedir}/src/main/webapp</resourceBase>
    <resourceBase>${work.dir}</resourceBase>
</resourceBases>
<extraClasspath>${bundles.dir}/cxp-fe-training-01/target/classes;${basedir}/target/classes/;${basedir}/target/portalserver/WEB-INF/classes</extraClasspath>
```
