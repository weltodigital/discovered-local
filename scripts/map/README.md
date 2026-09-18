# Rendering `public/portsmouth-map.png`

The city map on the homepage and `/creators` is a static image, rendered once
from OpenStreetMap data (OpenFreeMap's Positron style, recoloured to the site
palette) so the site carries no map library, tile requests or API key.

To re-render — e.g. to move the centre, change the zoom or tweak colours:

1. Edit `render.html` (centre/zoom in the `Map` options, colours at the top).
2. Serve this folder and render it with the installed Chrome:

   ```sh
   cd scripts/map
   python3 -m http.server 8765 &
   npx -y -p puppeteer-core@24 node shoot.mjs http://localhost:8765/render.html ../../public/portsmouth-map.png 900 2
   ```

3. Keep `ZOOM`, `VIEW` and `CENTER` in `src/components/site/PortsmouthMotif.tsx`
   in step with `render.html` — the pins are projected from those values.
   MapLibre zoom 12 with a 900 px viewport equals tile zoom 13 / `VIEW = 900`.

Attribution to OpenStreetMap contributors and OpenMapTiles is required and is
rendered by the component.
