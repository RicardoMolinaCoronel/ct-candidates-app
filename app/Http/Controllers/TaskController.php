<?php
namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
class TaskController extends Controller
{
    public function index(Request $request)
    {
        $query = Auth::user()->tasks(); // Only Authenticated User Tasks

        if ($request->has('status')) {
            $query->where('status', $request->status);
        }

        if ($request->has('orderBy')) {
            $query->orderBy($request->orderBy, $request->get('direction', 'asc'));
        }

        return response()->json($query->get());
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'order' => 'integer',
            'status' => 'in:pending,in_progress,completed'
        ]);


        $task = Auth::user()->tasks()->create($request->all());

        return response()->json($task, 201);
    }

    public function show($id)
    {
        $task = Auth::user()->tasks()->findOrFail($id);
        return response()->json($task);
    }

    public function update(Request $request, $id)
    {
        $task = Auth::user()->tasks()->findOrFail($id);
        $task->update($request->all());
        return response()->json($task);
    }

    public function destroy($id)
    {
        $task = Auth::user()->tasks()->findOrFail($id);
        $task->delete();
        return response()->json(['message' => 'Task deleted']);
    }
}
