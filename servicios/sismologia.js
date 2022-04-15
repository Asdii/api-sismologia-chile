import scrapeIt from 'scrape-it';

export async function getSismologia(url){
    const scrapingSismologia = await scrapeIt(url, {
        sismos: {
            listItem:'tr:not(:first-child)',
            data:{
                magnitud:'td:nth-last-child(1)',
                lugar:'td:nth-last-child(2)',
                hora: 'td:nth-last-child(3)',
                url: {
                    selector: 'td:nth-last-child(3) a',
                    attr: "href"
                }
            }
        }
    }).then(response => response = response.data);
    
    return scrapingSismologia;
}

export async function getSismologiaUnica(url){
    const scrapingSismologia = await scrapeIt(url, {
        horaLocal:'tr:nth-last-child(7) > td:nth-last-child(1)',
        horaUtc:'tr:nth-last-child(6) > td:nth-last-child(1)',
        latitud: 'tr:nth-last-child(5) > td:nth-last-child(1)',
        longitud: 'tr:nth-last-child(4) > td:nth-last-child(1)',
        profundidad: 'tr:nth-last-child(3) > td:nth-last-child(1)',
        magnitud: 'tr:nth-last-child(2) > td:nth-last-child(1)',
        referencia: 'tr:nth-last-child(1) > td:nth-last-child(1)',
        mapa: {
            selector: '.mapa img',
            attr: "src"
        }
        }).then(response => response = response.data);
    return scrapingSismologia;
}
