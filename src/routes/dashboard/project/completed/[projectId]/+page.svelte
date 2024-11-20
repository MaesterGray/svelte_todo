
<script>
    import Projectview from "$lib/components/Projectview.svelte";
    import { page } from "$app/stores";
    let {data} = $props()
</script>
<Projectview project={data.projectData} variant='completed' userId={data.userId} projectId={data.projectId}/>