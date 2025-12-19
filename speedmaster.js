export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname !== "/verify") {
      return new Response("Not found", { status: 404 });
    }

    const license = url.searchParams.get("license");
    const domain = url.searchParams.get("domain");

    const headers = {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, OPTIONS",
      "Access-Control-Allow-Headers": "*"
    };

    if (!license || !domain) {
      return new Response(
        JSON.stringify({ valid: false, reason: "missing_params" }),
        { status: 400, headers }
      );
    }

    const expected = btoa(domain + "::" + env.LICENSE_SECRET).slice(0, 32);

    if (license === expected) {
      return new Response(
        JSON.stringify({ valid: true }),
        { status: 200, headers }
      );
    }

    return new Response(
      JSON.stringify({ valid: false, reason: "invalid_license" }),
      { status: 200, headers }
    );
  }
};
