## Add Content Management to your Vue App

Usage is simple:

    vue create my-project
    cd my-project
    vue add contentservice
    
You can then view the site in development mode:

    yarn serve

Open your browser at http://localhost:8080.

### Managing the Content
To edit the content of the page press `control-option-escape` on a Mac or `control-alt-escape` on Windows.

> Note that the content shown is example data. Change it as you wish, but be aware that
> other people will see anything you enter, and also that the content gets reset
> regularly without warning so your changes may disappear.

### Further Information
To customise the site, or edit your own content see [ContentService.io](http://contentservice.io).

For more information about this and other prefabricated application components, refer to the [ToolTwist](http://tooltwist.com) website.

### Oops
This plugin, like most Vue CLI plugins, is intended to work on a fresh project created using `vue create`.
It will probably work for any existing project that has a similar file layout,
but if you have problems the code changes can usually be reversed out without much effort.

See [here](https://github.com/tooltwist/vue-cli-plugin-contentservice/wiki/What-this-Plugin-does) for a description of what this plugin does.
