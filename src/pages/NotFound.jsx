import Container from "../components/Container";
import Label from "../components/Label";
import Button from "../components/Button";

export default function NotFound() {
  return (
    <Container className="py-28 sm:py-36">
      <Label>404</Label>
      <h1 className="mt-4 text-4xl font-semibold">Page not found</h1>
      <p className="mt-4 max-w-md text-lg text-muted text-pretty">
        That link does not lead anywhere. Try the projects page instead.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Button to="/">Back home</Button>
        <Button to="/projects" variant="outline">
          View projects
        </Button>
      </div>
    </Container>
  );
}
