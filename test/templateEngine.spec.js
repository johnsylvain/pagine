import Template from '../src/templateEngine';

describe('Template Engine', function() {
  beforeEach(() => {
    this.template = new Template();

    document.body.innerHTML = `
      <script type="text/html" id="main">
        <h1><%= content %></h1>
      </script>
    `
  });

  it('should create a new engine', () => {
    expect(this.template).toBeInstanceOf(Template);
  });

  it('should inject data into template', () => {
    var htmlStr = this.template.tmpl('main', {content: 'hello'}).trim();
    expect(htmlStr).toBe('<h1>hello</h1>');
  })
})
