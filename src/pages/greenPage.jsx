import React from "react";
import "./css/greenPage.css"


export function StaticGreenPage(){
    return(
            <div className="App">
              <header className="App-header">
                <h1>Educación sobre Economía Circular</h1>
              </header>
              <main>
                <section>
                  <h2>¿Qué es la Economía Circular?</h2>
                  <p>
                    La economía circular es un modelo económico que busca redefinir el crecimiento,
                    enfocándose en beneficios positivos para toda la sociedad. Implica desvincular
                    gradualmente la actividad económica del consumo de recursos finitos y diseñar
                    los desechos fuera del sistema.
                  </p>
                </section>
                <section>
                  <h2>Impacto Ambiental de la Economía Circular</h2>
                  <p>
                    Implementar una economía circular puede reducir significativamente el impacto
                    ambiental. Al reutilizar y reciclar productos y materiales, reducimos la necesidad
                    de extraer nuevos recursos y disminuimos la cantidad de desechos que terminan en
                    vertederos.
                  </p>
                </section>
                <section>
                  <h2>Consejos Prácticos para Cuidar y Reparar Productos</h2>
                  <ul>
                    <li>
                      <strong>Mantenimiento Regular:</strong> Realiza un mantenimiento regular de tus productos
                      para evitar daños mayores. Limpia y revisa periódicamente el estado de los artículos.
                    </li>
                    <li>
                      <strong>Reparación:</strong> Antes de desechar un producto, considera repararlo. Hay muchos
                      recursos en línea y talleres locales que pueden ayudarte a darle una segunda vida a tus
                      pertenencias.
                    </li>
                    <li>
                      <strong>Reutilización Creativa:</strong> Piensa en maneras creativas de reutilizar productos
                      viejos. Por ejemplo, usa frascos de vidrio como recipientes de almacenamiento o transforma
                      ropa vieja en trapos de limpieza.
                    </li>
                    <li>
                      <strong>Compra con Sabiduría:</strong> Invierte en productos de alta calidad que están diseñados
                      para durar. Evita productos de un solo uso y opta por aquellos que pueden ser reciclados o
                      compostados.
                    </li>
                  </ul>
                </section>
                <section>
                  <h2>Recursos Educativos</h2>
                  <p>
                    Aquí tienes algunos recursos para aprender más sobre la economía circular:
                  </p>
                  <ul>
                    <li>
                      <a href="https://www.ellenmacarthurfoundation.org/circular-economy/what-is-the-circular-economy">
                        Fundación Ellen MacArthur: ¿Qué es la Economía Circular?
                      </a>
                    </li>
                    <li>
                      <a href="https://www.wrapp.org.uk/">
                        WRAP: Recursos y Acción sobre Residuos
                      </a>
                    </li>
                  </ul>
                  <div className="div-recicle-img">
                    <img src={`https://vimarenvironment.com/wp-content/uploads/2023/09/economia-circular.jpg`} alt="" className="recicle-img"/>
                  </div>
                </section>
              </main>
              <footer>
                <p>© 2024 Módulo Educativo sobre Economía Circular. Todos los derechos reservados.</p>
              </footer>
            </div>
    )
}