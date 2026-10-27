import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { reveal } from './directives/reveal'
import { initApotomeAnalytics } from './kit/analytics'
import { applyDeep, initApotomeEditor, loadPublishedContent } from './kit/editor'
import { content } from './data/site'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.directive('reveal', reveal)

app.mount('#app')

/* ----------------------------------------------------------------------
 * Apotome Labs studio: analytics, published copy overlay, in-situ editor.
 *
 * Opt-in on environment. With either variable unset this block does nothing
 * at all, so the site builds and runs standalone exactly as before.
 *
 * VITE_APOTOME_API_URL is read first and VITE_API_URL is the fallback: a
 * site that later grows a backend of its own takes VITE_API_URL for it, and
 * the studio keeps its own variable rather than quietly pointing the editor
 * at the wrong server.
 *
 * The published overlay is merged onto the content tree before the editor
 * starts, so the editor edits what visitors actually see rather than the
 * defaults compiled into the bundle. Mounting happens first either way: a
 * slow or unreachable studio API must never delay the site rendering.
 * ---------------------------------------------------------------------- */
const apotomeApi = (import.meta.env.VITE_APOTOME_API_URL ||
  import.meta.env.VITE_API_URL) as string | undefined
const apotomeKey = import.meta.env.VITE_APOTOME_SITE_KEY as string | undefined

if (apotomeApi && apotomeKey) {
  initApotomeAnalytics({ siteKey: apotomeKey, apiUrl: apotomeApi, router })

  void loadPublishedContent({ siteKey: apotomeKey, apiUrl: apotomeApi }).then((overlay) => {
    if (overlay) applyDeep(content, overlay)
    initApotomeEditor({ siteKey: apotomeKey, apiUrl: apotomeApi, config: content })
  })
}
