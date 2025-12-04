const { I } = inject();
const articlesPage = require('../pages/articles');

Then('devo ver uma lista de artigos na secao {string}', async (sectionName) => {
  await articlesPage.navegarParaSecaoArtigos();
  articlesPage.verificarListaArtigos();
});

Then('cada artigo deve exibir:', (table) => {
  articlesPage.verificarElementosArtigo();
});

Then('devo ver pelo menos {string} artigos visiveis', async (count) => {
  const articles = await articlesPage.contarArtigos();
  const expectedCount = parseInt(count);
  if (articles < expectedCount) {
    throw new Error(`Expected at least ${expectedCount} articles, but found ${articles}`);
  }
});

When('clico no link de um artigo', () => {
  articlesPage.clicarArtigo();
});

Then('devo ser redirecionado para a pagina completa do artigo', async () => {
  await articlesPage.verificarPaginaArtigo();
});

Then('devo ver o titulo do artigo', () => {
  I.seeElement(articlesPage.selectors.articleTitles);
});

Then('devo ver o conteudo completo do artigo', () => {
  articlesPage.verificarConteudoCompleto();
});

Then('devo ver a data de publicacao', () => {
  I.seeElement(articlesPage.selectors.articleDates);
});

Then('devo ver a categoria do artigo', () => {
  I.seeElement(articlesPage.selectors.articleCategories);
});

Given('que estou visualizando um artigo completo', async () => {
  await articlesPage.clicarArtigo();
  articlesPage.verificarConteudoCompleto();
});

Then('devo ver as informacoes padronizadas do artigo', () => {
  articlesPage.verificarInformacoesArtigo();
});

When('clico nos botoes de compartilhamento social', async () => {
  await I.click(articlesPage.selectors.shareButtons);
});

Then('devo poder compartilhar nas redes sociais', () => {
  I.seeElement(articlesPage.selectors.shareButtons);
});

Then('o link compartilhado deve ser valido', async () => {
  const url = await I.grabCurrentUrl();
  I.assertTrue(url.length > 10, 'URL deve ser válida');
});

Then('deve conter informacoes corretas do artigo', () => {
  I.seeElement(articlesPage.selectors.articleTitles);
});

When('rolo ate o final do artigo', async () => {
  await I.scrollTo(articlesPage.selectors.relatedArticles);
});

Then('devo ver uma secao de {string}', async (sectionName) => {
  await articlesPage.verificarArtigosRelacionados();
});

Then('devo ver pelo menos {string} artigos relacionados', async (count) => {
  await articlesPage.verificarArtigosRelacionados();
  const relatedCount = await I.grabNumberOfVisibleElements(`${articlesPage.selectors.relatedArticles} article, ${articlesPage.selectors.relatedArticles} .post`);
  const expectedCount = parseInt(count);
  if (relatedCount < expectedCount) {
    throw new Error(`Expected at least ${expectedCount} related articles, but found ${relatedCount}`);
  }
});

Then('cada artigo relacionado deve ter imagem e titulo', () => {
  I.seeElement(`${articlesPage.selectors.relatedArticles} img`);
  I.seeElement(`${articlesPage.selectors.relatedArticles} h1, ${articlesPage.selectors.relatedArticles} h2, ${articlesPage.selectors.relatedArticles} h3`);
});

Then('devo poder clicar nos artigos relacionados', async () => {
  await articlesPage.clicarArtigoRelacionado();
});

When('acesso uma categoria especifica como {string}', async (categoria) => {
  await articlesPage.filtrarPorCategoria(categoria);
});

Then('devo ver apenas artigos relacionados a financas', () => {
  I.see('finanças');
  articlesPage.verificarListaArtigos();
});

Then('todos os artigos devem estar corretamente categorizados', () => {
  I.seeElement(articlesPage.selectors.articleCategories);
});

Then('devo poder navegar entre as paginas da categoria', async () => {
  await articlesPage.verificarControlesPaginacao();
});

When('acesso um artigo especifico', async () => {
  await articlesPage.clicarArtigo();
});

When('navego para a categoria {string}', async (categoria) => {
  await articlesPage.filtrarPorCategoria(categoria);
});

Then('os artigos devem ser exibidos de acordo com a {string}', (categoria) => {
  articlesPage.verificarArtigosDaCategoria(categoria);
});

Then('deve haver paginacao na categoria {string} quando necessario', async (categoria) => {
  await articlesPage.verificarControlesPaginacao();
});