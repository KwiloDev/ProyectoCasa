import requests
import json
import time
import sys

# -------------------------------------------
# CONFIGURACIÓN
# -------------------------------------------

URL_ALOHA_BASE = "https://apialoha.crepesywaffles.com/respuestas_real"
URL_BUK_BASE = "https://crepesywaffles.buk.co/api/v1/colombia/employees?document_number="
BUK_TOKEN = "MBvNdTe4GQ8NZguVwZWr2CoW"


# -------------------------------------------
# FUNCIONES
# -------------------------------------------

def probar_formato_token():
    """Prueba automáticamente qué tipo de autenticación usa BUK."""
    formatos = [
        {"accept": "application/json", "auth_token": BUK_TOKEN},
        {"accept": "application/json", "X-Auth-Token": BUK_TOKEN},
        {"accept": "application/json", "Authorization": f"Bearer {BUK_TOKEN}"},
    ]
    url_prueba = f"{URL_BUK_BASE}1073669334"

    for headers in formatos:
        resp = requests.get(url_prueba, headers=headers)
        if resp.status_code == 200:
            return headers, False

    # Si todos fallan, probar con token en la URL
    resp = requests.get(f"{url_prueba}&auth_token={BUK_TOKEN}", headers={"accept": "application/json"})
    if resp.status_code == 200:
        return {"accept": "application/json"}, True

    print("🚫 Ningún formato funcionó. Revisa tu token o permisos en BUK.\n")
    sys.exit(1)


def obtener_lideres():
    """Consulta TODAS las páginas de Aloha y devuelve los IDs únicos de líderes."""
    pagina = 1
    documentos = set()

    while True:
        url = f"{URL_ALOHA_BASE}?pagina={pagina}&comp=CREPES%20Y%20WAFFLES%20S.A&ciudad=&pdv=&periodo=3"
        resp = requests.get(url)
        if resp.status_code != 200:
            break

        data = resp.json()
        lista = data.get("data") or data.get("respuestas_real") or data
        if not isinstance(lista, list) or not lista:
            break

        for item in lista:
            if isinstance(item, dict) and "lider_id" in item:
                doc = str(item["lider_id"]).strip()
                documentos.add(doc)

        pagina += 1
        time.sleep(0.3)

    return list(documentos)


def buscar_en_buk(documento, headers, token_en_url=False):
    """Busca un líder en BUK usando su número de documento."""
    url = f"{URL_BUK_BASE}{documento}"
    if token_en_url:
        url += f"&auth_token={BUK_TOKEN}"

    resp = requests.get(url, headers=headers)

    if resp.status_code == 401:
        sys.exit("🚫 Token inválido o expirado durante la búsqueda.")

    if resp.status_code != 200:
        return None

    data = resp.json()
    empleados = data.get("data") or []
    if not empleados:
        return None

    empleado = empleados[0]
    return {
        "documento": documento,
        "person_id": empleado.get("person_id"),
        "id_buk": empleado.get("id"),
        "nombre": empleado.get("full_name"),
        "cargo": (empleado.get("position") or {}).get("name", "N/A"),
        "sucursal": (empleado.get("location") or {}).get("name", "N/A"),
        "picture_url": empleado.get("picture_url"),
    }


# -------------------------------------------
# EJECUCIÓN PRINCIPAL
# -------------------------------------------

def main():
    headers, token_en_url = probar_formato_token()
    documentos = obtener_lideres()

    if not documentos:
        print("🚫 No se encontraron líderes para procesar.")
        return

    resultados = []
    for i, doc in enumerate(documentos, 1):
        empleado = buscar_en_buk(doc, headers, token_en_url)
        if empleado:
            resultados.append(empleado)
        time.sleep(0.4)

    with open("resultados_buk.json", "w", encoding="utf-8") as f:
        json.dump(resultados, f, indent=2, ensure_ascii=False)

    print(f"✅ Se encontraron {len(resultados)} líderes en total y se guardaron en 'resultados_buk.json'.")


# -------------------------------------------
# INICIO DEL SCRIPT
# -------------------------------------------
if __name__ == "__main__":
    main()