## Setup
A small amount of setup is needed to get up and running with Pagine. As of `1.1.X`, you need a module bundler to use Pagine in your projects. Install via npm or yarn;

__npm__
```
npm install pagine --save
```

__yarn__
```
yarn add pagine
```

## Configuration

### Setting the View
First we have to tell Pagine where to display the rendered content. This is accomplished by defining a `view`.

```
import Pagine from 'pagine';

new Pagine({
  view: '#view'
});
```

Our HTML should reflect the `view` that we have assigned.

```
<div id="view"></div>
```

### Creating templates
Templates allow us to define how our compiled HTML displays on the screen. We can create as many templates as we want that create different layouts (i.e. a main layout, post layout, etc).

A simple template may look like this:
```
<script type="text/html" id="main">
  <%= content %>
</script>
```

The `id` is the name of our template, in this case we called it `main`. The `<%= content %>` tag tells the template where to place the compiled HTML.

### Setting up routes
Now that we have our templates created, it's time to create routes for our application. A route consists of three parts:

- `path`: The route path
- `md`: The url of the markdown file
- `layout`: the name of the template

## Wiring it up
Using the three components from above, our completed configuration becomes:

__JavaScript__
```
import Pagine from 'pagine';

new Pagine({
  view: '#view',
  routes: [
    {
      path: '/home',
      md: './markdown/home.md',
      layout: 'main'
    }
  ]
})
```

__HTML__
```
<div id="view"></div>
<script type="text/html" id="main">
  <%= content %>
</script>
```

That's it! We now have a working application, our markdown is being rendered as HTML on the appropiate routes.