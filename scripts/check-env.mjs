const forbidden = Object.keys(process.env).filter((key) =>
  /TOKEN|SECRET|PASSWORD|PRIVATE_KEY|API_KEY/i.test(key),
);

if (forbidden.length > 0 && process.env.CI === "true") {
  console.error(`Sensitive environment names are not accepted by this check: ${forbidden.join(", ")}`);
  process.exit(1);
}

console.log("Environment naming check passed.");
