const QUERY = `
    query TableOfBins {
        binTable {
            lastModified
            etag
            sizeRange {
                min
                max
            }
        bins {
            number
            panSizeRange {
                min
                max
            }

            funding
            isInternational
            isCompany
            isToken
            product {
                name
            }
            brand {
                name
            }
            network {
                name
            }

            issuer {
                name
                legalName
                legalIds {
                cnpj {
                    number
                }
                }
            }

            allowedCaptures {
                name
                code
            }

            usages {
                name
                code
            }
            services {
                name
            }

            metadata {
                image {
                width
                height
                url
                }
            }
            }

            reserved {
                number
            }
        }
}`;

function showBinsTable() {
    
    const client = GraphQL.makeClient("https://hml-api.elo.com.br/graphql"); 
    client.setHeader("client_id", "d92b1009-8940-34cc-ae28-5b1dabea9d29");
    client.setHeader("Content-Type", "application/json");
    client.query(QUERY, function(response) {
        let bins = response.data.binTable.bins;
        bins.filter((e) => {
            e.panSizeRange = JSON.stringify(e.panSizeRange)
            e.product = JSON.stringify(e.product.name);
            e.brand = JSON.stringify(e.brand.name);
            e.network = JSON.stringify(e.network.name);
            e.issuer = JSON.stringify(e.issuer);
            e.allowedCaptures = JSON.stringify(e.allowedCaptures);
            e.usages = JSON.stringify(e.usages);
            e.services = JSON.stringify(e.services);
            e.metadata = JSON.stringify(e.metadata);
        })
        let table = ConvertJsonToTable(bins);
        let binstableContainer = document.querySelector('#binstableContainer');
        binstableContainer.innerHTML = table;

        let downloadbinsBt = document.querySelector('#downloadbins');
        downloadbinsBt.style.display = 'block';
    });
    
}

function downloadBinsTable() {
    exportTableToCSV.apply(this, [$('#binstableContainer>table'), 'tablebins.csv']);
}

window.addEventListener('load', function() {
    let showbinsBt = document.querySelector('#showbins');
    let downloadbinsBt = document.querySelector('#downloadbins');
    showbinsBt.addEventListener('click', showBinsTable);
    downloadbinsBt.addEventListener('click', downloadBinsTable);
})
